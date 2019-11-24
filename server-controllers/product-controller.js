const ProductDao = require("../dao/product-dao");
const Security = require("../security/security-be");
const {brandsEnum} = require("../security/commond-be")
const {isNull, isUndefined} = require('lodash')
const findOneBySlug = (slug) => new Promise((res, rej) => {
    ProductDao.findOne({slug: slug}, (err, item) => {
        if (item) {
            res(item);
        }
    })
})


const findSamePrice = (gT, lT) => new Promise((res, rej) => {
    ProductDao.find({price: {$gte: gT, $lte: lT}}, (err, ret) => {
        res(ret);
    })
})
module.exports = (app) => {

    app.post('/add-product', (req, res) => {
        console.log(req.body)
        let p = new ProductDao(req.body)
        ProductDao.create(req.body , (err , p ) => {
            if (err) {
                console.log(err)
                return res.send({error: true, message: 'Thêm sản phẩm không thành công !'})
            }
            return res.send({error: false, product: p, message: "Thêm sản phẩm thành công !"})
        } )
    })

    app.get('/get-products', (req, res) => {
        ProductDao.find({}, (err, prds) => {

            return res.send({error: false, list: prds.reverse()})

        })
    })

    app.get('/get-product/:slug', async (req, res) => {
        try {
            let item = await findOneBySlug(req.params.slug);
            return res.send({error: false, product: item})
        } catch (e) {
            console.log(e);
            return res.send({error: true, message: 'Not Found'})
        }

    })


    app.get('/get-same-price/:slug', async (req, res) => {
        let range = 2000000;
        try {
            let item = await findOneBySlug(req.params.slug.toLowerCase());
            if (!item) {
                return res.send([]);
            } else {
                let rets = await findSamePrice(item.price - range, item.price + range);

                return res.send(rets.filter(o => o.slug != req.params.slug.toLowerCase()));
            }
        } catch (e) {
            console.log(e);
            return res.send([])
        }
    })

    app.get('/get-filter-product', async (req, res) => {
        let {brand, ram, sim = null, from = null, to = null} = req.query;
        let price = isNull(from) ? isNull(to) ? {$gte: from, $lte: to} : {$gte: from} : {$exists: true};
        console.log(ram)
        ProductDao.find(
            {
                brand: ( brand === 'all'  ) ? {$exists: true} : brandsEnum[brand.toUpperCase()],
                ram : ram > 0 ? ram  : {$exists: true},
                price: price
            }, (err, prds) => {
                return res.send(prds)
            })
    })
}
