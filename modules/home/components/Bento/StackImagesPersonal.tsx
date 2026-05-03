import Stack from "@/common/components/elements/StackImages";

const images = [
  { id: 1, img: "/images/arya-1.jpeg" },
  { id: 2, img: "/images/arya-2.jpeg" },
  { id: 3, img: "/images/arya-3.jpg" },
  { id: 4, img: "/images/arya-4.webp" },
];

const StackImagesPersonal = () => {
  return (
    <div className="flex h-full w-full items-center justify-center py-12">
      <Stack
        randomRotation={true}
        sensitivity={100}
        sendToBackOnClick={true}
        cardDimensions={{ width: 150, height: 200 }}
        cardsData={images}
      />
    </div>
  );
};

export default StackImagesPersonal;
