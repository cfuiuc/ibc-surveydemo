export default function Editorial() {
  return (
    <section style={{ paddingTop: "6rem", paddingBottom: "8rem" }} className="px-6">
      <div className="mx-auto max-w-[640px]">
        <div
          className="border border-il-storm-95 p-10"
          style={{
            borderRadius: 2,
            borderTop: "3px solid transparent",
            borderImage: "linear-gradient(135deg, #FCB316 0%, #FF5F05 100%) 1",
            borderImageSlice: "1 0 0 0",
          }}
        >
          <p className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs mb-6">
            What this means for IBC
          </p>
          {/* EDITORIAL: replace this */}
          <div className="font-body text-il-storm-50 text-lg leading-relaxed italic">
            Editorial block — Charlie writes the recommendations here.
          </div>
        </div>
      </div>
    </section>
  );
}
