"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseRepository = void 0;
const service_1 = require("../service");
const exceptions_1 = require("../exceptions");
class DatabaseRepository {
    constructor() {
        this.knexConnection = null;
    }
    bindCon(conName) {
        const newRepository = new (this.constructor)();
        const connection = service_1.ObjectionService.connection(conName || this.model.connection);
        newRepository.knexConnection = connection;
        return newRepository;
    }
    setModel(model) {
        this.model = model;
        return this;
    }
    async all() {
        return this.query();
    }
    async firstWhere(inputs, error = true) {
        const query = this.query();
        const model = await query.findOne(inputs);
        if (error && !model)
            this.raiseError();
        return model;
    }
    async getWhere(inputs, error = true) {
        const query = this.query();
        for (const key in inputs) {
            Array.isArray(inputs[key])
                ? query.whereIn(key, inputs[key])
                : query.where(key, inputs[key]);
        }
        const models = await query;
        if (error && models.length == 0)
            this.raiseError();
        return models;
    }
    async create(inputs) {
        return this.query().insert(inputs).returning('*');
    }
    async createOrUpdate(conditions, values) {
        const model = await this.firstWhere(conditions, false);
        if (!model) {
            return this.create(Object.assign(Object.assign({}, conditions), values));
        }
        await this.update(model, values);
        return await this.firstWhere(conditions, false);
    }
    async firstOrNew(conditions, values) {
        const model = await this.firstWhere(conditions, false);
        if (model)
            return model;
        return await this.create(Object.assign(Object.assign({}, conditions), values));
    }
    async update(model, setValues) {
        const query = this.query();
        if (!model.id)
            return;
        query.findById(model.id).patch(setValues);
        return await query;
    }
    async updateWhere(where, setValues) {
        const query = this.query();
        query.where(where).patch(setValues);
        return query;
    }
    async exists(params) {
        const query = this.query();
        query.where(params);
        return !!(await query.onlyCount());
    }
    async count(params) {
        const query = this.query();
        query.where(params);
        return await query.onlyCount();
    }
    async delete(model) {
        return !!+(await this.query().deleteById(typeof model != 'object' ? model : model.id));
    }
    async deleteWhere(inputs) {
        const query = this.query();
        for (const key in inputs) {
            Array.isArray(inputs[key])
                ? query.whereIn(key, inputs[key])
                : query.where(key, inputs[key]);
        }
        return !!+(await query.delete());
    }
    async refresh(model) {
        return model ? await this.query().findById(model.id) : undefined;
    }
    async attach(model, relation, payload) {
        await model.$relatedQuery(relation).relate(payload);
        return;
    }
    async sync(model, relation, payload) {
        await model.$relatedQuery(relation).unrelate();
        if (Array.isArray(payload) && payload.length > 0) {
            await model.$relatedQuery(relation).relate(payload);
        }
        return;
    }
    async chunk(where, size, cb) {
        const query = this.query();
        query.where(where);
        await query.chunk(cb, size);
        return;
    }
    raiseError() {
        throw new exceptions_1.ModelNotFound(this.getEntityName() + ' not found');
    }
    query() {
        if (!this.knexConnection) {
            this.knexConnection = service_1.ObjectionService.connection(this.model.connection);
        }
        return this.model.query(this.knexConnection);
    }
    getEntityName() {
        return this.model.name;
    }
    async updateAndReturn(where, setValues) {
        const query = this.query();
        const records = await query.where(where).patch(setValues).returning('*');
        if (records.length == 1)
            return records[0];
        return records;
    }
    async bulkInsert(inputs) {
        return this.query().insert(inputs).returning('*');
    }
}
exports.DatabaseRepository = DatabaseRepository;
//# sourceMappingURL=database.js.map