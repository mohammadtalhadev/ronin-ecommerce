function AnnouncementBar() {
  const announcements = [
    { text: "10th Year Anniversary Programme", color: "text-orange-600 font-semibold" },
    { text: "Mega Independence Sale", color: "text-green-600 font-semibold" },
    { text: "Product Customization", color: "text-gray-600" },
    { text: "Express Delivery", color: "text-gray-600" },
    { text: "Gift Store", color: "text-gray-600" },
    { text: "Track Order", color: "text-gray-600" },
    { text: "Contact Us", color: "text-gray-600" },
  ]

  return (
    <div className="bg-#F0F0F0 text-xs border-b border-gray-100">
      <div className="flex items-center justify-center gap-3 py-3 px-8 flex-wrap">
        {announcements.map((item, index) => (
          <span key={index} className="flex items-center gap-3">
            <span className={item.color}>{item.text}</span>
            {index !== announcements.length - 1 && <span className="text-gray-300"></span>}
          </span>
        ))}
      </div>
    </div>
  )
}

export default AnnouncementBar