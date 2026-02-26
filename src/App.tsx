import { Layout } from "./components/layout/Layout";
import { Hero } from "./components/sections/Hero";
import { Philosophy } from "./components/sections/Philosophy";
import { Infrastructure } from "./components/sections/Infrastructure";
import { VisualBreak } from "./components/sections/VisualBreak";
import { CTA } from "./components/sections/CTA";

const App = () => {
  return (
    <Layout>
      <Hero />
      <Philosophy />
      <Infrastructure />
      <VisualBreak />
      <CTA />
    </Layout>
  );
};

export default App;
