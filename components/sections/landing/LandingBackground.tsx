import FloatingLines from "@/components/ui/FloatingLines";

export default function LandingBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <FloatingLines
        enabledWaves={["top", "middle", "bottom"]}
        lineCount={[4, 5, 6]}
        lineDistance={[10, 8, 6]}
        bendRadius={5.0}
        bendStrength={-0.5}
        interactive={true}
        parallax={true}
        linesGradient={["#6a4fb3", "#3a4a7c", "#8a6fae"]}
        topWavePosition={{ x: 0.0, y: 0.7, z: 0.5 }}
        middleWavePosition={{ x: 0.0, y: 0.0, z: 0.0 }}
      />
    </div>
  );
}