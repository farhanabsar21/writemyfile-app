"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const template_controller_1 = require("./template.controller");
const router = (0, express_1.Router)();
router.get("/", template_controller_1.getTemplatesHandler);
exports.default = router;
