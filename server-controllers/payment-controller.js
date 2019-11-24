const PaymentDao = require("../dao/payment-dao");
const CartDao = require("../dao/cart-dao");
var mongoose= require("mongoose") ;
const crypto = require('crypto');
var rp = require('request-promise');
const stripe = require('stripe')('sk_test_uVixRGhukph9tsgopFsKX9ck00QPzFUKL4');
const ProductDao = require("../dao/product-dao")
const checkCart = (cartId) => new Promise((res, rej) => {
    CartDao.findOne({_id: cartId ,  hasPaid : false }, (err, cart) => {
        if (cart) res(cart);
        res(null)
    })
})
module.exports = (app) => {
    app.post('/payment', async (req, res) => {
        let p = new PaymentDao({...req.body, cartId : mongoose.Types.ObjectId(req.body.cartId)});
        p.save(err => {
            if (err) return res.send({error: true, message: 'Failed'})
            CartDao.findOneAndUpdate({_id: req.body.cartId}, {hasPaid: true}, {new: false}, (err, rs) => {
                if (err) return res.send({error: true, message: 'Failed'})
                return res.send({error: false, message: 'Done', payment: p});
            })
        })
    })


    app.post('/momo/payment', async (req, res) =>{
        const {cartId } = req.body ;
        const cart =  await checkCart(cartId);
        if(cart){
            var partnerCode = "MOMODL6H20191118"
            var accessKey = "fwPrvTI6oCzpRsiQ"
            var serectkey = "3X1aU7sxGTTQTeE4eknB9kaymeQIKYSs"
            var orderInfo = "Đồ án thanh toán qua MoMo"
            var amount = "" + cart.total_price;
            var returnUrl = "http://localhost:5001/checkout"
            var notifyurl = "https://momo.vn"
            var orderId = "BY" + new Date().getTime() + 'AX';
            var requestId ="BY"+ (new Date().getTime()  +3434343 )+ 'AX';
            var requestType = "captureMoMoWallet"
            var extraData = ""
            var rawSignature = "partnerCode="+partnerCode+"&accessKey="+accessKey+"&requestId="+requestId+"&amount="+amount+"&orderId="+orderId+"&orderInfo="+orderInfo+"&returnUrl="+returnUrl+"&notifyUrl="+notifyurl+"&extraData="+extraData
            var signature = crypto.createHmac('sha256', serectkey)
                .update(rawSignature)
                .digest('hex');

            let formData={
                partnerCode : partnerCode,
                accessKey : accessKey,
                requestId : requestId,
                amount : amount,
                orderId : orderId,
                orderInfo : orderInfo,
                returnUrl : returnUrl,
                notifyUrl : notifyurl,
                extraData : extraData,
                requestType : requestType,
                signature : signature,
            }

            let ops={
                method: 'POST',
                uri: 'https://test-payment.momo.vn/gw_payment/transactionProcessor',
                body: formData,
                json: true // Automatically stringifies the body to JSON
            }

            rp(ops).then(function (parsedBody) {
                // POST succeeded...

                return res.send(parsedBody)
            })
                .catch(function (err) {
                    // POST failed...
                });

        }else{
            return res.send([])
        }

    })

    app.post('/stripe/payment', async (req, res) =>{
        const {cartId } = req.body ;
        const cart =  await checkCart(cartId);

        if(cart){
            console.log(cart)
            let lineItems= cart.products.map(o => {
                return{
                    name: o.name,
                    description: 'My Description' ,
                    images: [`http://localhost:5001/${o.images[0].filePath}`],
                    amount: o.price,
                    currency: 'vnd',
                    quantity: o.quantity ,
                }
            })
            try{
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: lineItems ,
                    success_url: 'http://localhost:5001/payment-detail/{CHECKOUT_SESSION_ID}',
                    cancel_url: 'http://localhost:5001/manage/payments?session_id={CHECKOUT_SESSION_ID}',
                });

                return res.send({session})
                // if(session){
                //     PaymentDao.create({...req.body, cartId : mongoose.Types.ObjectId(req.body.cartId) , sessionId : session.id } ,(err, pm) =>{
                //         if (err) return res.send({error: true, message: 'Failed'})
                //         else{
                //             CartDao.findOneAndUpdate({_id: req.body.cartId}, {hasPaid: true}, {new: false}, (err, rs) => {
                //                 if (err) return res.send({error: true, message: 'Failed'})
                //                 return res.send({error: false, message: 'Done', payment: pm , session : session});
                //             })
                //         }
                //     })
                // }else{
                //     return res.send([]);
                // }

                // let p = new PaymentDao({...req.body, cartId : mongoose.Types.ObjectId(req.body.cartId) , sessionId : session.id });
                // p.save(err => {
                //     if (err) return res.send({error: true, message: 'Failed'})
                //     CartDao.findOneAndUpdate({_id: req.body.cartId}, {hasPaid: true}, {new: false}, (err, rs) => {
                //         if (err) return res.send({error: true, message: 'Failed'})
                //         return res.send({error: false, message: 'Done', payment: p , session : session});
                //     })
                // })
            }catch(e){
                console.log(e.message)

                return res.send({error :true , message : e.message })
            }

        }else{
            return res.send([]);
        }

    })
    app.get('/payments', async (req, res) => {
        PaymentDao.aggregate(
            [
                {
                $lookup:  {
                    from: "cart",
                    localField: "cartId",
                    foreignField: "_id",
                    as: "cart"
                }
            }]
        ).exec((err, arr) => {

            if (err) throw err;
            return res.send(arr)

        })
    })

    app.get('/payment-detail/:sessionId' , async (req, res )=>{

        let session = await  stripe.checkout.sessions.retrieve( req.params.sessionId );
        console.log(session)

        return res.send(session)
    })


}