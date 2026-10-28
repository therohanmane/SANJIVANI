const { db } = require('../firebase/admin');
const fs = require('fs');
const path = require('path');

const coursesFile = path.join(__dirname, '../data/courses.json');

const readLocalCourses = () => {
  try {
    if (!fs.existsSync(coursesFile)) return [];
    return JSON.parse(fs.readFileSync(coursesFile, 'utf8') || '[]');
  } catch (e) {
    console.error('Error reading local courses:', e);
    return [];
  }
};

const writeLocalCourses = (data) => {
  try {
    fs.writeFileSync(coursesFile, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('Error writing local courses:', e);
    return false;
  }
};

// Generic error handler
const handleError = (res, err, message) => {
  console.error(message, err);
  res.status(500).json({ error: message, details: err.message });
};

// GET all courses
const getAllCourses = async (req, res) => {
  try {
    if (!db) {
      return res.status(200).json(readLocalCourses());
    }
    const snapshot = await db.collection('courses').get();
    if (snapshot.empty) {
      return res.status(200).json(readLocalCourses());
    }
    const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(courses);
  } catch (err) {
    res.status(200).json(readLocalCourses());
  }
};

// GET single course
const getCourseById = async (req, res) => {
  try {
    if (!db) {
      const courses = readLocalCourses();
      const course = courses.find(c => c.id === req.params.id);
      if (!course) return res.status(404).json({ error: 'Course not found' });
      return res.status(200).json(course);
    }
    const docRef = db.collection('courses').doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      const courses = readLocalCourses();
      const course = courses.find(c => c.id === req.params.id);
      if (!course) return res.status(404).json({ error: 'Course not found' });
      return res.status(200).json(course);
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (err) {
    handleError(res, err, 'Failed to get course');
  }
};

// POST new course
const createCourse = async (req, res) => {
  try {
    const newCourse = { id: req.body.id || 'course_' + Date.now(), ...req.body };
    if (!db) {
      const courses = readLocalCourses();
      courses.push(newCourse);
      writeLocalCourses(courses);
      return res.status(201).json(newCourse);
    }
    const docRef = await db.collection('courses').add(newCourse);
    res.status(201).json({ id: docRef.id, ...newCourse });
  } catch (err) {
    handleError(res, err, 'Failed to create course');
  }
};

// PUT update course
const updateCourse = async (req, res) => {
  try {
    if (!db) {
      const courses = readLocalCourses();
      const idx = courses.findIndex(c => c.id === req.params.id);
      if (idx !== -1) {
        courses[idx] = { ...courses[idx], ...req.body };
        writeLocalCourses(courses);
        return res.status(200).json(courses[idx]);
      }
    }
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
    if (!db) {
      const courses = readLocalCourses();
      const filtered = courses.filter(c => c.id !== req.params.id);
      writeLocalCourses(filtered);
      return res.status(200).json({ message: 'Course deleted successfully' });
    }
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
