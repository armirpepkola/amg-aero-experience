export default function Page() {
  return (
    <div className="w-full">
      {/* Chapter 1 */}
      <section className="h-screen w-full flex items-center px-12 pointer-events-none">
        <div className="max-w-xl">
          <h1 className="text-7xl font-bold tracking-tighter uppercase text-white">The Inhale</h1>
          <p className="text-neutral-400 mt-4 text-lg">Massive air intakes feed the hand-crafted V8 biturbo, dictating the aggressive aerodynamic posture of the front fascia.</p>
        </div>
      </section>

      {/* Chapter 2 */}
      <section className="h-screen w-full flex items-center justify-end px-12 pointer-events-none">
        <div className="max-w-xl text-right">
          <h1 className="text-7xl font-bold tracking-tighter uppercase text-white">Boundary Layer</h1>
          <p className="text-neutral-400 mt-4 text-lg">Carbon-fiber hood louvers exhaust turbulent air from the wheel wells, establishing a laminar flow over the greenhouse.</p>
        </div>
      </section>

      {/* Chapter 3 */}
      <section className="h-screen w-full flex items-center px-12 pointer-events-none">
        <div className="max-w-xl">
          <h1 className="text-7xl font-bold tracking-tighter uppercase text-white">Downforce</h1>
          <p className="text-neutral-400 mt-4 text-lg">An electronically adjustable dual-plane rear wing anchors the chassis to the tarmac at extraordinary velocities.</p>
        </div>
      </section>
      
      {/* Spacer to allow reaching the absolute bottom of the animation */}
      <section className="h-[20vh] w-full" />
    </div>
  );
}