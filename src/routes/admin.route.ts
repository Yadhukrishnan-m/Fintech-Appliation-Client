import express, { NextFunction, Request, Response } from "express";

import { authenticateAdmin } from "../middlewares/admin-auth.middleware";
import { TYPES } from "../config/inversify/inversify.types";
import { AuthAdminController } from "../controllers/admin/auth-admin.controllers";
import { container } from "../config/inversify/inversify.config";
import { UserManagementController } from "../controllers/admin/user-management.controllers";
import { LoanManagementController } from "../controllers/admin/loan-management.controllers";
import { uploadLoanImage } from "../middlewares/multer.middleware";
import { ApplicationManagementController } from "../controllers/admin/application-management.controllers";

const authAdminController = container.get<AuthAdminController>(
  TYPES.AuthAdminController
);
const userManagementController = container.get<UserManagementController>(
  TYPES.UserManagementController
);
const loanManagementController = container.get<LoanManagementController>(
  TYPES.LoanManagementController
);
const applicationManagementControlelr=container.get<ApplicationManagementController>(TYPES.ApplicationManagementController)

const router = express.Router();

router.post("/login", (req: Request, res: Response, next: NextFunction) =>
{   authAdminController.login(req, res, next)}
);
router.post("/logout", (req: Request, res: Response, next: NextFunction) =>
  authAdminController.logout(req, res, next)
);
router.get(
  "/unverified-users",
  authenticateAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    userManagementController.getUnverifiedUsers(req, res, next)
);
router.get(
  "/verified-users",
  authenticateAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    userManagementController.getVerifiedUsers(req, res, next)
);
router.get(
  "/user/:id",
  authenticateAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    userManagementController.getUserById(req, res, next)
);

router.patch(
  "/verify-user/:id",
  authenticateAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    userManagementController.verifyUser(req, res, next)
);
router.patch(
  "/blacklist-user/:id",
  authenticateAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    userManagementController.blacklistUser(req, res, next)
);
router.post(
  "/create-loan",
  authenticateAdmin,
  uploadLoanImage,
  (req: Request, res: Response, next: NextFunction) =>
    loanManagementController.createLoan(req, res, next)
);
router.get(
  "/loans",
  authenticateAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    loanManagementController.getLoans(req, res, next)
);
router.patch(
  "/loans/:loanId/toggle-status",
  authenticateAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    loanManagementController.toggleLoanStatus(req, res, next)
);

router.get(
  "/loan/:loanId",
  authenticateAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    loanManagementController.getLoan(req, res, next)
);
router.put(
  "/update-loan/:loanId",
  authenticateAdmin,uploadLoanImage,
  (req: Request, res: Response, next: NextFunction) =>
    loanManagementController.updateLoan(req, res, next)
);
router.get(
  "/applications",
  authenticateAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    applicationManagementControlelr.getApplications(req, res, next)
);

router.get(
  "/application/:applicationId",
  authenticateAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    applicationManagementControlelr.getApplication(req, res, next)
);

router.patch(
  "/verify-application/:applicationId",
  // authenticateAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    applicationManagementControlelr.verifyApplication(req, res, next)
);


export default router;
