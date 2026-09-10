function AnnouncementBar() {
  const announcements = [
    {
      text: "10th Year Anniversary Programme",
      color: "text-orange-600 font-semibold",
    },
    {
      text: "Mega Independence Sale",
      color: "text-green-600 font-semibold",
    },
    {
      text: "Product Customization",
      color: "text-gray-600",
    },
    {
      text: "Express Delivery",
      color: "text-gray-600",
    },
    {
      text: "Gift Store",
      color: "text-gray-600",
    },
    {
      text: "Track Order",
      color: "text-gray-600",
    },
    {
      text: "Contact Us",
      color: "text-gray-600",
    },
  ];

  return (
    <div className="hidden border-b border-gray-100 bg-[#F0F0F0] text-xs md:block">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-8 py-3">
        {announcements.map((item, index) => (
          <span
            key={item.text}
            className="flex items-center gap-3 whitespace-nowrap"
          >
            <span className={item.color}>{item.text}</span>

            {index !== announcements.length - 1 && (
              <span
                aria-hidden="true"
                className="h-3 w-px bg-gray-300"
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementBar;
