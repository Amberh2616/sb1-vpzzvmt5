import { Router } from 'express';
import { EmailController } from '../controllers/email.controller';

const router = Router();
const emailController = new EmailController();

router.get('/emails', (req, res) => emailController.getEmails(req, res));
router.post('/emails', (req, res) => emailController.sendEmail(req, res));
router.post('/emails/:id/read', (req, res) => emailController.markAsRead(req, res));

export default router;