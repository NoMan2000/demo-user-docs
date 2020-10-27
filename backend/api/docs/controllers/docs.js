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
            ctx.throw(400, "Please upload an Image")
        }
        debugger;
        // TODO:  The user here needs to be from a query.
        const user = await strapi
          .query('user', 'users-permissions')
          .findOne({ id: data.user });
        data.user = user;
        // data.uploads = files;
        // const { user } = ctx.state

        entity = await strapi.services.docs.create({ ...data }, { files }).catch(err => {
          debugger;
          throw err;
        })
    } else {
        ctx.throw(400, "Please use multipart/form-data");
    }

    return sanitizeEntity(entity, { model: strapi.models.docs })
},

async update (ctx) {
  debugger;
    const {id} = ctx.params;
    const { data, files } = parseMultipartData(ctx);
    debugger;
    const user = await strapi
          .query('user', 'users-permissions')
          .findOne({ id: data.user });
          debugger;
    data.user = user;
    // data.uploads = files;
    let entity;

    entity = await strapi.services.docs.update({ id }, {...data}, {files});


    return sanitizeEntity(entity, {model: strapi.models.docs})
},

async delete(ctx){
    const {id} = ctx.params
    const {user} = ctx.state

    const entity = await strapi.services.post.delete({id, author: user.id})

    return sanitizeEntity(entity, {model: strapi.models.post})
}

};
