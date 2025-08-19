import { QRCodeCanvas } from "qrcode.react";

const QRPage = () => {
  const siteURL = "http:// 192.168.43.21:3000"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Scan QR to Open Project</h1>
      <QRCodeCanvas value={siteURL} size={200} bgColor="#ffffff" fgColor="#000000" />
      <p className="mt-4 text-gray-600 dark:text-gray-300">{siteURL}</p>
    </div>
  );
};

export default QRPage;