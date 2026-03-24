const express = require('express');
const router = express.Router();
const inquiriesController = require('../controllers/inquiriesController');
// Note: We can add admin auth middleware to GET routes here if needed

router.get('/contacts', inquiriesController.getContacts);
router.post('/contacts', inquiriesController.postContact);
router.delete('/contacts/:id', inquiriesController.deleteContact);

router.get('/enrollments', inquiriesController.getEnrollments);
router.post('/enrollments', inquiriesController.postEnrollment);
router.delete('/enrollments/:id', inquiriesController.deleteEnrollment);

router.get('/service_requests', inquiriesController.getServiceRequests);
router.post('/service_requests', inquiriesController.postServiceRequest);
router.delete('/service_requests/:id', inquiriesController.deleteServiceRequest);

module.exports = router;
