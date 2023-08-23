import React from "react";
import Post from "./Post";
const dummy = [
  {
    id: 1,
    username: "Chatjak Boonthiang",
    userImg:
      "https://www.facebook.com/photo/?fbid=5687548091367599&set=a.101419799980484",
    img: "https://www.facebook.com/photo.php?fbid=2091124151010029&set=pb.100003373922926.-2207520000.&type=3",
    caption: "This is dummy data test.",
  },
  {
    id: 2,
    username: "Khwankao Boonthiang",
    userImg:
      "https://www.facebook.com/photo.php?fbid=2812152822396731&set=pb.100008061211474.-2207520000.&type=3",
    img: "https://www.facebook.com/photo.php?fbid=2525789964366353&set=pb.100008061211474.-2207520000.&type=3",
    caption: "This is dummy data by kkwan.",
  },
];
export default function Posts() {
  return (
    <div>
      {dummy.map((data) => (
        <Post
          key={data.id}
          id={data.id}
          username={data.username}
          userImg={data.userImg}
          img={data.img}
          caption={data.caption}
        />
      ))}
    </div>
  );
}
