import { QRCodeCanvas } from "qrcode.react";

const QrPage = () => {
  const siteURL = window.location.origin;

  const downloadQR = () => {
    const canvas = document.querySelector<HTMLCanvasElement>("#qr-gen");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "project-qr.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Scan to Open Project
      </h1>

      <QRCodeCanvas id="qr-gen" value={siteURL} size={220} includeMargin />

      <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
        {siteURL}
      </p>

      <button
        onClick={downloadQR}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Download QR
      </button>
    </div>
  );
};

export default QrPage;