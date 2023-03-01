"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomQueryBuilder = void 0;
const objection_1 = require("objection");
class CustomQueryBuilder extends objection_1.QueryBuilder {
    async paginate(page, perPage) {
        page = +page ? +page : 1;
        perPage = +perPage ? +perPage : 15;
        const result = await this.page(page - 1, perPage);
        return {
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(result.total / perPage),
                perPage,
                total: result.total,
                count: result.results.length,
            },
            data: result.results,
        };
    }
    async allPages() {
        return { data: (await this) };
    }
    async all() {
        return (await this);
    }
    async onlyCount() {
        const result = (await this.count({ c: '*' }));
        return +result[0].c;
    }
    async exists() {
        const result = await this.onlyCount();
        return !!result;
    }
    async chunk(cb, size) {
        let offset = 0;
        let hasMore = true;
        while (!!!offset || hasMore) {
            const query = structuredClone(this);
            const records = (await query.offset(offset).limit(size));
            hasMore = !(records.length > 0);
            if (!hasMore)
                return;
            await cb(records);
            offset += size;
        }
    }
    cOrderBy(expressions) {
        const orders = (expressions || '').split('|');
        for (const order of orders) {
            const [column, direction] = order.split(':');
            if (!column)
                continue;
            this.orderBy(column, (direction || 'ASC'));
        }
        return this;
    }
    when(condition, truthyCb, falsyCb) {
        if (condition) {
            return truthyCb(this, condition);
        }
        else if (falsyCb) {
            return falsyCb(this, condition);
        }
        else {
            return this;
        }
    }
    safeWhereIn(col, expr) {
        if (!Array.isArray(expr))
            return this;
        if (Array.isArray(expr) && expr.length < 1)
            return this;
        return this.whereIn(col, expr);
    }
    safeWhereNotIn(col, expr) {
        if (!Array.isArray(expr))
            return this;
        if (Array.isArray(expr) && expr.length < 1)
            return this;
        return this.whereNotIn(col, expr);
    }
}
exports.CustomQueryBuilder = CustomQueryBuilder;
//# sourceMappingURL=queryBuilder.js.map