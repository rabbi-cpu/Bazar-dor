const Footer = () => {
  return (
    <footer className="border-t border-[#dce7dc] bg-[#fbfdfb] px-4 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
        <p className="text-sm font-bold text-gray-800">
          🛒 বাজার দর
          <span className="font-normal text-gray-600">
            {" "}— প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </span>
        </p>

        <p className="text-xs text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;