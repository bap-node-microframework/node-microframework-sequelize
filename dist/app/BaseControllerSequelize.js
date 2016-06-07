"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('bap-node-microframework/core');
var BaseControllerSequelize = (function (_super) {
    __extends(BaseControllerSequelize, _super);
    function BaseControllerSequelize() {
        _super.apply(this, arguments);
    }
    BaseControllerSequelize.prototype.get = function (res, model) {
        if (typeof model !== "string") {
            res.status(200).json(model);
        }
    };
    BaseControllerSequelize.prototype.cget = function (res, model) {
        core_1.Container.getModel(model).findAll().then(function (data) { res.status(200).json(data); }, function (err) { res.status(404).json({ error: err }); });
    };
    BaseControllerSequelize.prototype.post = function (model, form, request, response) {
        if (typeof model === "string") {
            model = core_1.Container.getModel(model).build();
        }
        BaseControllerSequelize.processForm(model, form, request, response);
    };
    BaseControllerSequelize.prototype.put = function (model, form, request, response) {
        BaseControllerSequelize.processForm(model, form, request, response);
    };
    BaseControllerSequelize.processForm = function (model, form, request, response) {
        form.handle(request, {
            success: function (form) {
                Object.keys(form.data).forEach(function (key) {
                    model[key] = form.data[key];
                });
                model.save().then(function (savedModel) {
                    if (request.method === 'PUT') {
                        return response.status(204).send();
                    }
                    return response.status(201).send(savedModel);
                }, function (error) { response.status(500).json(error); });
            },
            error: function (form) {
                response.status(400).json(form);
            },
            empty: function (form) {
                response.status(404).json(form);
            }
        });
    };
    BaseControllerSequelize.prototype.delete = function (res, object) {
        object.destroy().then(function () { res.status(204).send(); }, function (err) { res.status(500).json({ error: err }); });
    };
    return BaseControllerSequelize;
}(core_1.BaseController));
exports.BaseControllerSequelize = BaseControllerSequelize;
//# sourceMappingURL=BaseControllerSequelize.js.map