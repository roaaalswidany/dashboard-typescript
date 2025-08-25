import { QRCodeCanvas } from "qrcode.react";

const QRPage = () => {

  const siteURL = "dashboard-typescript-git-main-roaaalswidanys-projects.vercel.app";

  return (
    <div className="flex flex-col items-center justify-center h-[87vh] bg-gray-100 dark:bg-gray-900 px-4">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white text-center">
        Scan QR to Open Project
      </h1>


      <div className="p-3 bg-white rounded-lg shadow-md">
        <QRCodeCanvas
          id="qr-gen"
          value={siteURL}
          size={220} 
          includeMargin
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>

      <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm break-words text-center">
        {siteURL}
      </p>

      <button
        onClick={() => {
          const canvas = document.getElementById("qr-gen") as HTMLCanvasElement;
          if (!canvas) return;
          const url = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = url;
          link.download = "project-qr.png";
          link.click();
        }}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Download QR
      </button>
    </div>
  );
};

export default QRPage;