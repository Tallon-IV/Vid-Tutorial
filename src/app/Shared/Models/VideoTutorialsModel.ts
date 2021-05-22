/**
 * Describes the data within a video tutorial object retrieved from the test server.
 */
export interface VideoTutorial
{
  id: string;
  videoUrl: string;
  videoTitle: string;
  tags: string[];
  teacherName: string;
  teacherId: string;
  averageUserRating: number;
}
