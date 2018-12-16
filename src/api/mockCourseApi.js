import delay from "./delay";
import { courses } from "../../tools/mockData";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

// This would be performed on the server in a real app. Just stubbing in.
function generateId(course) {
  return replaceAll(course.title, " ", "-");
}

export function getAllCourses() {
  return new Promise(resolve => {
    setTimeout(() => resolve([...courses]), delay);
  });
}

export function saveCourse(unsavedCourse) {
  // Clone to avoid mutating the reference passed in.
  const course = { ...unsavedCourse };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate server-side validation
      const minCourseTitleLength = 2;
      if (course.title.length < minCourseTitleLength) {
        reject(`Title must be at least ${minCourseTitleLength} characters.`);
      }

      if (course.id) {
        const existingCourseIndex = courses.findIndex(a => a.id == course.id);
        courses.splice(existingCourseIndex, 1, course);
      } else {
        // Simulating creation here.
        // The server would generate course id in a real app.
        course.id = generateId(course);
        courses.push(course);
      }

      resolve(course);
    }, delay);
  });
}

export function deleteCourse(course) {
  return new Promise(resolve => {
    setTimeout(() => {
      const indexOfCourseToDelete = courses.findIndex(
        course => course.courseId == course.id
      );
      courses.splice(indexOfCourseToDelete, 1);
      resolve(course);
    }, delay);
  });
}
