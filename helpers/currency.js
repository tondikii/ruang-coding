function convertRupiah (value){
    return new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(value)
}

// console.log(convertRupiah(1000));
module.exports = convertRupiah;