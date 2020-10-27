'use strict';

const { parseMultipartData, sanitizeEntity} = require('strapi-utils')


/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity
    if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);

        if(!data) {
            ctx.throw(400, "Must attach something to the document.")
        }

        if(!files || !Object.keys(files).length) {
            // ctx.throw(400, "Please upload an Image")
        }
        // TODO:  The user here needs to be from a query.
        const user = await strapi
          .query('user', 'users-permissions')
          .findOne({ id: data.user });
        data.user = user;
        entity = await strapi.services.docs.create({ ...data }, { files }).catch(err => {
          throw err;
        });
        const docEntity = await strapi.query('categories')
          .findOne({ id: data.categories });

          docEntity.docs.push(entity);
          const resp = await strapi.query('categories').update({ id: data.categories }, { ...docEntity });

    } else {
        ctx.throw(400, "Please use multipart/form-data");
    }

    return sanitizeEntity(entity, { model: strapi.models.docs })
},

async update (ctx) {
    const {id} = ctx.params;
    const { data, files } = parseMultipartData(ctx);
    const user = await strapi
          .query('user', 'users-permissions')
          .findOne({ id: data.user });
    data.user = user;
    // data.uploads = files;
    let entity;

    entity = await strapi.services.docs.update({ id }, {...data}, {files});
    const docEntity = await strapi.query('categories')
      .findOne({ id: data.categories });

    const hasDoc = docEntity.docs.find(d => d.id === id )
    if (!hasDoc) {
      docEntity.docs.push(entity);
      const resp = await await strapi.query('categories').update({ id: docEntity.id }, { ...docEntity });

    }



    return sanitizeEntity(entity, {model: strapi.models.docs})
},

async delete(ctx){
    const {id} = ctx.params
    const {user} = ctx.state

    const entity = await strapi.services.post.delete({id, author: user.id})

    return sanitizeEntity(entity, {model: strapi.models.post})
}

};
