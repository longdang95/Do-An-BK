const CartDao = require("../dao/cart-dao");
const ProductDao = require("../dao/product-dao")
const security = require("../security/security-be")
const mongoose = require('mongoose');
const checkCart = (cartId) => new Promise((res, rej) => {
    CartDao.findOne({_id: cartId}, (err, cart) => {
        if (cart) res(cart);
        res(null)
    })
})

const findProductById = (id) => new Promise((res, rej) => {
    ProductDao.findOne({_id: id}, (err, item) => {
        if (item) {
            res(item);
        }
    })
})


const createCart = (products = [] , user = null ) => new Promise((res, rej) => {
    let draft = {
        products,
        total_price: calTotalPrice(products),
        userId : user ? mongoose.Types.ObjectId(user._id) : null
    }
    let cart = new CartDao(draft);
    cart.save(err => {
        res(cart);
    })
})
const calTotalPrice = (products) => {
    if (!products || products.length == 0 || !products) return 0;
    return products.reduce((u, o) => {
        console.log(o.quantity)
        return u + o.price * o.quantity;
    }, 0)
}
const isExpriedTime = (created, time = 20 * 24 * 60 * 60 * 1000 /*2day */) => {
    let current = new Date();
    return (current - created) <= time;
}
module.exports = (app) => {
    app.get('/init-cart/:cartId', (req, res) => {
        createCart(req)
        if (checkCart(req.cartId)) {
            res.send('cart')
        } else {
            res.send('none')
        }
    })

    app.get('/cart-overview/:cartId', async (req, res) => {
        let cart = await checkCart(req.params.cartId)
        if (cart.active) {
            return res.send({isExist: true, cart})
        } else {
            return res.send({isExist: false, cart: null})
        }
    })


    app.post('/cart', security.checkUser ,  async (req, res) => {
        let {cartId, productId, quantity} = req.body;
        let cart = await checkCart(cartId);
        let prd = await findProductById(productId);
        let isNewCart = false;
        if (!cart) {
            isNewCart = true;
            console.log('create new cart')
            cart = await createCart([
                {
                    ...prd._doc,
                    quantity: quantity
                }
            ], req.user );
        }
        if (cart) {
            let upSertListProducts = (list, prd, quantity) => {
                let finder = list.filter((o) => {
                    return o.slug == prd.slug
                })
                // console.log(finder)
                if (finder.length > 0) {
                    console.log('old')

                    let nl = list;
                    for (let i = 0; i < nl.length; i++) {
                        if (nl[i].slug === prd.slug) {
                            nl[i].quantity += quantity;
                            break;
                        }
                    }
                    return nl;

                } else {
                    console.log('new')
                    let pd = Object.assign({}, prd, {quantity: quantity});
                    let nl = list;
                    nl.push(pd)
                    return nl;
                }
            }

            if (prd) {
                let prds = isNewCart ? [{
                    ...prd._doc,
                    quantity: 1
                }] : upSertListProducts(cart.products, prd._doc, quantity);
                let total_price = calTotalPrice(prds);
                let upcart = {
                    ...cart._doc,
                    products: prds,
                    total_price: total_price
                }
                console.log(upcart)

                if (isNewCart) {
                    let dr = new CartDao(upcart);
                    dr.save(err => {
                        return res.send(upcart)
                    })
                } else {
                    CartDao.findOneAndUpdate({_id: cartId}, upcart, {new: true}, (err, rs) => {
                        console.log('upsert')
                        return res.send(rs);
                    })

                }


            }

            console.log('active')
        } else {
            console.log('deactive')
        }

    })

    // xóa sản phẩm ra khỏi giỏ hàng.
    app.get('/cart/:cartId/clear-product/:productId', async (req, res) => {
        let {cartId, productId} = req.params;
        let cart = await checkCart(cartId);
        let prds = cart.products.filter(p => p._id != productId);
        let total_price = calTotalPrice(prds);
        let upsert = {
            ...cart._doc,
            products: prds,
            total_price: total_price
        }
        if (cart) {
            CartDao.findOneAndUpdate({_id: cartId}, upsert, {new: true}, (err, rs) => {
                return res.send(rs);
            })
        } else {
            return res.send({});
        }
    })
}