import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const CourseId = params.id;
  return <div>{CourseId}</div>;
};

export default Page;
