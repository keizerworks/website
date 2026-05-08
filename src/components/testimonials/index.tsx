import Script from "next/script";

const Testimonials = () => {
  return (
    <section className="bg-[#F7F8FF] text-[#07070A]">
      <Script
        src="https://testimonial.to/js/iframeResizer.min.js"
        strategy="lazyOnload"
      />
      <div className="max-w-[1536px] mx-auto md:px-24 px-4 pb-[60px] md:pb-[100px]">
        <div className="grid md:grid-cols-2 gap-6">
          <iframe
            id="testimonialto-embed-text--Os5LUzzAfLrcDlpjJKD"
            src="https://embed-v2.testimonial.to/text/-Os5LUzzAfLrcDlpjJKD"
            frameBorder="0"
            scrolling="no"
            width="100%"
            className="min-h-[450px] md:min-h-[350px]"
          />
          <iframe
            id="testimonialto-embed-text--Os5KBnX0cr-KspZVvc7"
            src="https://embed-v2.testimonial.to/text/-Os5KBnX0cr-KspZVvc7"
            frameBorder="0"
            scrolling="no"
            width="100%"
            className="min-h-[450px] md:min-h-[350px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
