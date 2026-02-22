import TrueFocus from "@/common/components/elements/TrueFocus";

const TrueFocusService = () => {
  return (
    <div className="flex h-full items-center justify-center px-8 py-6">
      <TrueFocus
        sentence=" UI/UX Web Mobile AI IoT"
        manualMode={false}
        blurAmount={5}
        borderColor="blue"
        animationDuration={1}
        pauseBetweenAnimations={1}
      />
    </div>
  );
};

export default TrueFocusService;
