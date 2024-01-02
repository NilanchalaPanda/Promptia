import Feed from "@components/Feed";
import PromptCard from "@components/PromptCard";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="md:hidden" />{" "}
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nihil neque facere quas. Doloremque in ex facere odit eum tenetur modi suscipit doloribus, temporibus sequi nemo amet explicabo.
      </p>

      {/* FEED COMPONENT */}
      <Feed />
    </section>
  );
};

export default Home;
