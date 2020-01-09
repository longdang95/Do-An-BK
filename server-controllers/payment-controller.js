const  Security = require("../security/security-be");

const PaymentDao = require("../dao/payment-dao");
const CartDao = require("../dao/cart-dao");
var mongoose = require("mongoose");
const crypto = require('crypto');
var rp = require('request-promise');
const stripe = require('stripe')('sk_test_uVixRGhukph9tsgopFsKX9ck00QPzFUKL4');
const ProductDao = require("../dao/product-dao")
const checkCart = (cartId) => new Promise((res, rej) => {
    CartDao.findOne({_id: cartId}, (err, cart) => {
        if (cart) res(cart);
        res(null)
    })
})

const handleCheckoutSession = (session) => {

    PaymentDao.findOneAndUpdate({sessionId: session.id, status: 1}, {status: 2}, {new: false}, (err, rs) => {
        if (err) {
            console.log(err)
        } else {
            // console.log('payment has completed with sessionid : ' + session.id);
        }

    })
}


let runcompleted = async ()=>{
    // 60s check 1 lần các payment thành công ;
    setInterval( async ()=>{
        console.log('check completed')
        const events = stripe.events.list({
            type: 'checkout.session.completed',
            created: {
                // Check for events created in the last 24 hours.
                gte: Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000),
            },
        });

        // For older versions of Node, see https://github.com/stripe/stripe-node/#auto-pagination
        for await (const event of events) {
            const session = event.data.object;

            // Fulfill the purchase...
            handleCheckoutSession(session);
        }
    },60000)

}

module.exports = (app , host) => {

    runcompleted()

    // tạo tất cả payments ;
    app.post('/payment', async (req, res) => {
        let p = new PaymentDao({...req.body, cartId: mongoose.Types.ObjectId(req.body.cartId)});
        p.save(err => {
            if (err) return res.send({error: true, message: 'Failed'})
            CartDao.findOneAndUpdate({_id: req.body.cartId}, {hasPaid: true}, {new: false}, (err, rs) => {
                if (err) return res.send({error: true, message: 'Failed'})
                return res.send({error: false, message: 'Done', payment: p});
            })
        })
    })


    // xử lý thanh toán qua Momo

    app.post('/momo/payment' , Security.checkUser , async (req, res) => {
        const {cartId} = req.body;
        const cart = await checkCart(cartId);
        if (cart) {
            var partnerCode = "MOMODL6H20191118"
            var accessKey = "fwPrvTI6oCzpRsiQ"
            var serectkey = "3X1aU7sxGTTQTeE4eknB9kaymeQIKYSs"
            var orderInfo = "Đồ án thanh toán qua MoMo"
            var amount = "" + cart.total_price;
            var notifyurl = host +"/api/"
            var orderId = cart._id;
            var requestId = "DOAN" + new Date().getTime() + 'BK';
            var returnUrl = host + "/payment-detail/" + requestId;
            var requestType = "captureMoMoWallet"
            var extraData = ""
            var rawSignature = "partnerCode=" + partnerCode + "&accessKey=" + accessKey + "&requestId=" + requestId + "&amount=" + amount + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&returnUrl=" + returnUrl + "&notifyUrl=" + notifyurl + "&extraData=" + extraData
            var signature = crypto.createHmac('sha256', serectkey)
                .update(rawSignature)
                .digest('hex');

            let formData = {
                partnerCode: partnerCode,
                accessKey: accessKey,
                requestId: requestId,
                amount: amount,
                orderId: orderId,
                orderInfo: orderInfo,
                returnUrl: returnUrl,
                notifyUrl: notifyurl,
                extraData: extraData,
                requestType: requestType,
                signature: signature,
            }

            let ops = {
                method: 'POST',
                uri: 'https://test-payment.momo.vn/gw_payment/transactionProcessor',
                body: formData,
                json: true // Automatically stringifies the body to JSON
            }

            rp(ops).then(function (parsedBody) {
                // POST succeeded...
                if(parsedBody){
                    PaymentDao.create({...req.body , status: 2, sessionId : parsedBody.requestId , userId : req.user ? req.user._id : null  },(err, rs)=>{
                        console.log(rs);
                        CartDao.findOneAndUpdate({_id: cart._id}, {active: false}, {new: true}, (err, rm) => {
                            console.log('hhh')
                            return res.send(parsedBody)
                        })
                    })
                }else return res.send({})
            })
                .catch(function (err) {
                    // POST failed...
                    console.log(err)
                    return res.send({})
                });

        } else {
            return res.send([])
        }

    })


    // xử lý thanh toán qua thẻ Visa ( sử dụng dịch vụ của Stripe )
    app.post('/stripe/payment', Security.checkUser , async (req, res) => {
        const {cartId} = req.body;
        const cart = await checkCart(cartId);

        if (cart) {
            let lineItems = cart.products.map(o => {
                return {
                    name: o.name,
                    description: 'My Description',
                    images: [`${host}/${o.images[0].filePath}`],
                    amount: o.price,
                    currency: 'vnd',
                    quantity: o.quantity,
                }
            })
            try {
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: lineItems,
                    success_url: host + '/payment-detail/{CHECKOUT_SESSION_ID}',
                    cancel_url: host + '/manage/payments?session_id={CHECKOUT_SESSION_ID}',
                });
                if (session) {
                    PaymentDao.create({
                        ...req.body,
                        cartId: mongoose.Types.ObjectId(req.body.cartId),
                        sessionId: session.id,
                        status: 1
                    }, (err, pm) => {
                        if (err) return res.send({error: true, message: 'Failed'})
                        else {
                            CartDao.findOneAndUpdate({_id: cart._id}, {active: false}, {new: true}, (err, rm) => {
                                return res.send({error: false, session: session})
                            })
                        }
                    })

                } else {
                    return res.send({error: true, message: 'Không tạo được session !'})
                }
            } catch (e) {
                console.log(e.message)

                return res.send({error: true, message: e.message})
            }

        } else {
            return res.send([]);
        }

    })

    // lay danh sach payments
    app.get('/payments', async (req, res) => {
        PaymentDao.aggregate(
            [
                {
                    $lookup: {
                        from: "cart",
                        localField: "cartId",
                        foreignField: "_id",
                        as: "cart"
                    }
                }]
        ).exec((err, arr) => {

            if (err) throw err;
            return res.send(arr.reverse().map(p => ( p.status == 0 || p.status ==1  ) && (new Date().getTime() - new Date(p.created).getTime()) > 24*60*60*1000 ? ({...p, status : 3}) : p   ))

        })
    })


    // lấy dữ liệu thanh toán của cart
    app.get('/payment-detail/:sessionId', async (req, res) => {
        let {sessionId} =  req.params ;

        try{
            PaymentDao.findOne({sessionId : sessionId} ,(err, pm)=>{
                if(err) return res.send({});
                CartDao.findOne({_id : pm.cartId },(err, cart) =>{
                    console.log(cart);
                    return res.send({error :false , cart :{...cart._doc , ...pm._doc} })
                })
            })
        }catch(e){
            return res.send({error :true , message : 'Khong tim thay !'})
        }

        // let session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
        // console.log(session)
        //
        // return res.send(session)
    })


    app.get('/user-payments' , Security.authorDetails , async (req,res)=>{
        try{
            PaymentDao.find({ userId : req.user._id },(err,pms)=>{
                CartDao.find({_id : {$in : pms.map(o => o.cartId)} , userId : req.user._id } ,(err, carts)=>{
                    console.log(carts)
                    let mergeData= pms.map((o,i)=> ({...o._doc , cart : carts[i] }))
                    return res.send(mergeData)
                })
            })
        }catch(e){
            console.log(e) ;
            return res.send([])
        }
    })

}