const dbHelper = require('../utils/db');

// Generic error handler
const handleError = (res, err, message) => {
  console.error(message, err);
  res.status(500).json({ error: message, details: err.message });
};

// GET all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await dbHelper.getAll('courses');
    res.status(200).json(courses);
  } catch (err) {
    handleError(res, err, 'Failed to get courses');
  }
};

// GET single course
const getCourseById = async (req, res) => {
  try {
    const course = await dbHelper.getById('courses', req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    handleError(res, err, 'Failed to get course');
  }
};

// POST new course
const createCourse = async (req, res) => {
  try {
    const newCourse = await dbHelper.add('courses', req.body);
    res.status(201).json(newCourse);
  } catch (err) {
    handleError(res, err, 'Failed to create course');
  }
};

// PUT update course
const updateCourse = async (req, res) => {
  try {
    const updated = await dbHelper.update('courses', req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    handleError(res, err, 'Failed to update course');
  }
};

// DELETE course
const deleteCourse = async (req, res) => {
  try {
    await dbHelper.remove('courses', req.params.id);
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
