const helper = require('../helpers/helper');

module.exports = {

    send: (res, data, message, status) => {
        status = status || ( (typeof message === 'number') ? message : 200 );
        let response = {
            success: (status == 200 || status == 204)
        };
                
        if(typeof data === 'string') {
            response.message = data;
        } else {
            if(data) {
                response = {...response, ...{data: data}};
            }
            if(message && typeof message === 'string') {
                response.message = message;
            }
        }

        if(res.token) {
            response.token = res.token;
        }

        res.status(status).json(response);
    },

    table: async (req, model, includes, query) => {
        const page = req.query.page ? Number(req.query.page) : 1;
        const size = req.query.size ? Number(req.query.size) : 10;
        const dir = req.query.dir || 'desc';
        const isExport = (req.query.export == 1);

        let order = '';
        if(req.query.order) {
            if(req.query.order.includes('.')) {
                const relatedModel = req.query.order.split('.');
                order = [[ relatedModel[0], relatedModel[1], dir ]];
            } else {
                order = [[ req.query.order, dir ]];
            }
        } else {
            order = [ [ 'id' , dir ] ];
        }
        
        let params = {
            limit: size,
            offset: (page - 1) * size,
            order: order
        };

        if(isExport) {
            delete params['limit'];
            delete params['offset'];
        }

        let where = {};

        // filters
        const filters = helper.getFilterParams(req.query);
        const filterKeys = Object.keys(filters);
        if (filterKeys.length) {
            filterKeys.forEach(k => {
                if(filters[k].includes(':')) {
                    where[k] = {
                        '$between': filters[k].split(':')
                    };
                } else {
                    where[k] = filters[k];
                }
            });                     
        }
        
        // search
        if (req.query.search && model.searchFields) {
            where['$or'] = model.searchFields.map((field) => {
                const searchQuery = {};
                if (field.includes('.')) {
                    field = `$${field}$`;                
                }
                searchQuery[field] = { $like: `%${req.query.search}%` };
                return searchQuery;
            });
        }        

        // concat parameters
        if(query) {
            where = {...where, ...query}
        }

        params.where = where;

        // add relations
        if(includes) {
            params.include = includes;
        }
        
        const data = isExport ? await model.findAll(params) : await model.findAndCountAll(params);
        if(!isExport) {
            data['filtered'] = req.filters ? (data.count - size) : data.count;
        }

        return data;
    },

    passportOpts: {
        session: false,
        failWithError: true
    }

};