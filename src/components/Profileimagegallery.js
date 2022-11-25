import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import _ from "underscore";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

import { Gallery, Item } from "react-photoswipe-gallery";
const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/"
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/"
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/"
  }
];
function Profileimagegallery(params) {
  console.log("image galleryyyyyyyyyyyyyyyyyyyyyyyyyyy");
  //console.log(params.user);
  const profileImages = params.images;

  const set = new Set([profileImages]);
  Array.from(set);
  //console.log(profileImages);
  var result = _.filter(
    _.uniq(params.images, function (item, key, a) {
      return item.original;
    }),
    function (element) {
      return element.original && element.thumbnail;
    }
  );
  //   console.log(result.length);
  // const [thumbnail, setthumbnail] = useState(false);
  // result.length > 1 ? setthumbnail(true) : setthumbnail(false);
  // const [imagesstate, setimagesstate] = useState();
  // let images = [
  // setimagesstate(
  //     set?.map((image) => ({
  //         original: image,
  //         thumbnail: image,
  //     }))
  // );
  // ];
  // useEffect(() => {
  // let profileimages = [];
  // profileimages = [...profileimages, profileimage];
  // profileimages = [...profileimages, pic1];
  // profileimages = [...profileimages, pic2];
  // setprofileimages("");
  // setprofileimages((state) => [...state, profileimage]);
  // setprofileimages((state) => [...state, pic1]);
  // setprofileimages((state) => [...state, pic2]);
  // setprofileimages([...profileimages, profileimage]);
  // setprofileimages([...profileimages, pic1]);
  // setprofileimages([...profileimages, pic2]);
  //}, []);
  return (
    <div>
      <ImageGallery
        items={result ? result : ""}
        showNav={false}
        showPlayButton={false}
        showThumbnails={result.length > 1}
        showBullets={result.length > 1}
        className="mat__profileimagegallery"
      />
      {/* {result.map((image, index) => image.original)} */}
      {/* <Gallery>
                {result.map((image, index) => {
                    <Item
                        original={`${image.original}?image=${index}`}
                        thumbnail={`${image.original}?image=${index}`}
                        width="1024"
                        height="768"
                    >
                        {({ ref, open }) => (
                            <img
                                ref={ref}
                                onClick={open}
                                src={`${image.original}?image=1`}
                                alt=""
                            />
                        )}
                    </Item>;
                })}
            </Gallery> */}
      {/* <Gallery>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "240px 171px 171px",
                        gridTemplateRows: "114px 114px",
                        gridGap: 12,
                    }}
                >
                    <Item
                        original="https://placekitten.com/1024/768?image=1"
                        thumbnail="https://placekitten.com/80/60?image=1"
                        width="1024"
                        height="768"
                    >
                        {({ ref, open }) => (
                            <img
                                ref={ref}
                                onClick={open}
                                src="https://placekitten.com/80/60?image=1"
                                alt=""
                            />
                        )}
                    </Item>
                    <Item
                        original="https://placekitten.com/1024/768?image=2"
                        thumbnail="https://placekitten.com/80/60?image=2"
                        width="1024"
                        height="768"
                    >
                        {({ ref, open }) => (
                            <img
                                ref={ref}
                                onClick={open}
                                src="https://placekitten.com/80/60?image=2"
                                alt=""
                            />
                        )}
                    </Item>
                </div>
            </Gallery> */}
      {/* <Item
                    original="https://placekitten.com/1024/768?image=2"
                    thumbnail="https://placekitten.com/80/60?image=2"
                    width="1024"
                    height="768"
                >
                    {({ ref, open }) => (
                        <img
                            ref={ref}
                            onClick={open}
                            src="https://placekitten.com/80/60?image=2"
                            alt=""
                        />
                    )}
                </Item> */}
    </div>
  );
}

export default Profileimagegallery;
