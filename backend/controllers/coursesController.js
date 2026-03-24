const { db } = require('../firebase/admin');

// Generic error handler
const handleError = (res, err, message) => {
  console.error(message, err);
  res.status(500).json({ error: message, details: err.message });
};

// GET all courses
const getAllCourses = async (req, res) => {
  try {
    if (!db) return res.status(500).json({ error: 'Database not initialized' });
    const snapshot = await db.collection('courses').get();
    const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(courses);
  } catch (err) {
    handleError(res, err, 'Failed to get courses');
  }
};

// GET single course
const getCourseById = async (req, res) => {
  try {
    const docRef = db.collection('courses').doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (err) {
    handleError(res, err, 'Failed to get course');
  }
};

// POST new course
const createCourse = async (req, res) => {
  try {
    const newCourse = req.body;
    const docRef = await db.collection('courses').add(newCourse);
    res.status(201).json({ id: docRef.id, ...newCourse });
  } catch (err) {
    handleError(res, err, 'Failed to create course');
  }
};

// PUT update course
const updateCourse = async (req, res) => {
  try {
    const docRef = db.collection('courses').doc(req.params.id);
    await docRef.update(req.body);
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (err) {
    handleError(res, err, 'Failed to update course');
  }
};

// DELETE course
const deleteCourse = async (req, res) => {
  try {
    await db.collection('courses').doc(req.params.id).delete();
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    handleError(res, err, 'Failed to delete course');
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};
