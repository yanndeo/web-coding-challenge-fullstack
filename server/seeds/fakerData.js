const mongoose = require('mongoose');
const faker = require('faker');
const config = require('config');
const Shop = require('../models/Shop');


const fakerShopData = async () => {

    try {

      let shops = await Shop.find();

      if (shops.length === 0) {

        for (let i = 1; i <= config.get('faker_data_shop'); i++) {

          let name = faker.company.companyName(String,3);
          let street = faker.address.streetAddress();
          let city = faker.address.city();
          let zipcode = faker.address.zipCode();
          let phone = faker.phone.phoneNumber();
          let lng = faker.address.longitude();
          let lat = faker.address.latitude();
          let type = faker.random.arrayElement(['restaurant', 'Ready-To-wear', 'perfumeries', 'apple-store', 'mall', 'phone-store']);
          let imageURL = faker.random.arrayElement(['cloth_1.jpg', 'blog_4.jpeg', 'blog_3.jpg', 'blog_2.jpg', 'blog_1.jpg'])

          //Build profile objet
          let magasinFields = {};
          magasinFields.name = name;
          magasinFields.type = type;
          magasinFields.imageURL = imageURL;

          magasinFields.contact_information = {};
          magasinFields.contact_information.city = city;
          magasinFields.contact_information.phone = phone;
          magasinFields.contact_information.street = street;
          magasinFields.contact_information.zipcode = zipcode;
          magasinFields.location = {};
          magasinFields.location.coordinates = [ Number(lng), Number(lat) ];

          let shopObj = new Shop(magasinFields);
          await shopObj.save();
          //
          let shops = await Shop.find();

          console.log("Faker_info: Data Generate", shops);
          console.log( i, "Faker_info: Data has been generated");

        }

        }else{
        console.log(' Faker_info: Database already contains data');

        }

    } catch (error) {
      console.log('faker_shops', error.message);
      //res.status(500).send('Server Error')
    }
};

module.exports = fakerShopData;