import Stack from "@/common/components/elements/StackImages";

const images = [
  { id: 1, img: "/images/arya-1.jpeg" },
  { id: 2, img: "/images/arya-2.jpeg" },
  { id: 3, img: "/images/arya-3.jpg" },
  { id: 4, img: "/images/arya-4.webp" },
];

const StackImagesPersonal = () => {
  return (
    <div className="flex items-center justify-center pb-2">
      <Stack
        randomRotation={true}
        sensitivity={100}
        sendToBackOnClick={true}
        cardDimensions={{ width: 100, height: 150 }}
        cardsData={images}
      />
    </div>
  );
};

export default StackImagesPersonal;
