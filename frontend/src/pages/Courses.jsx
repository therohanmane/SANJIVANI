import { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Clock, Tag } from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app with backend configured, we'd fetch from /api/courses
    // For now we'll mock it if backend is empty or fails.
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        if (response.data && response.data.length > 0) {
          setCourses(response.data);
        } else {
          setCourses(mockCourses);
        }
      } catch (error) {
        console.warn('Backend not reachable, using mock data for Courses', error);
        setCourses(mockCourses);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const mockCourses = [
    { id: 1, title: 'MS-CIT Certification', description: 'Master basic computer skills and MS Office with the official Govt authorized MS-CIT program.', duration: '3 Months', fees: '₽4500', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'Tally Prime with GST', description: 'Complete hands-on training for accounting, inventory, and taxation using Tally Prime.', duration: '2 Months', fees: '₽3500', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'Web Development Bootcamp', description: 'Learn HTML, CSS, JavaScript, React and Node.js to become a Full-Stack developer.', duration: '6 Months', fees: '₽12000', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 4, title: 'Digital Marketing', description: 'SEO, SEM, Social Media Marketing and Analytics for the modern digital era.', duration: '3 Months', fees: '₽8000', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Professional <span className="text-primary-600">Training Programs</span></h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Enhance your skillset and boost your career with our industry-recognized certification courses taught by highly experienced professionals.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
              <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=60'} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{course.title}</h3>
                  <p className="text-slate-600 mb-6 flex-1 text-sm leading-relaxed">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4"/> {course.duration}</div>
                    <div className="flex items-center gap-1 font-semibold text-slate-900"><Tag className="w-4 h-4"/> {course.fees}</div>
                  </div>

                  <button className="w-full py-3 bg-primary-50 text-primary-700 font-semibold rounded-lg hover:bg-primary-600 hover:text-white transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Courses;
