const { BlogPost, Categories, User } = require('../../models');
const helpers = require('../../helpers/helpers');

const {
  validBlogPost,
} = require('../validator');

const createServices = async (data) => {
  const { error } = validBlogPost.validate(data);
  if (error) return { status: helpers.QOO, message: error.details[0].message };

  const { categoryIds: id } = data;
  const exist = await Categories.findOne({ where: { id } });
  if (!exist) return { status: helpers.QOO, message: '"categoryIds" not found' };
  const result = await BlogPost.create(data);
  await result.addCategorie(data.categoryIds, { through: {} });
  return result;
};

const findServices = async () => {
  try {
    const result1 = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categories, as: 'categories', through: { attributes: [] } },
      ],
    });
    console.log(result1);
    return result1;
    
  } catch (error) {
    console.log(error);
  }
    // return result;
  // [
  //   {
  //     "id": 1,
  //     "title": "Post do Ano",
  //     "content": "Melhor post do ano",
  //     "userId": 1,
  //     "published": "2011-08-01T19:58:00.000Z",
  //     "updated": "2011-08-01T19:58:51.000Z",
  //     "user": {
  //       "id": 1,
  //       "displayName": "Lewis Hamilton",
  //       "email": "lewishamilton@gmail.com",
  //       "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2017_Malaysia.jpg"
  //     },
  //     "categories": [
  //       {
  //         "id": 1,
  //         "name": "Inovação"
  //       }
  //     ]
  //   }
  // ]
};

module.exports = {
  createServices,
  findServices,
};
