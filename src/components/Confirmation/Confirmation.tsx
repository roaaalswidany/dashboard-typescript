

interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  actionType?: "delete" | "logout";
}

const Confirmation = ({
  message,
  onConfirm,
  onCancel,
  actionType = "logout",
}: ConfirmationDialogProps) => {
  const settings = {
    delete: {
      title: "Delete Confirmation",
      confirmText: "Delete",
      iconColor: "bg-red-100 dark:bg-red-900",
      buttonColor: "bg-red-600 hover:bg-red-700",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      ),
    },
    logout: {
      title: "Logout Confirmation",
      confirmText: "Logout",
      iconColor: "bg-blue-100 dark:bg-blue-900",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      ),
    },
  };

  const currentSettings = settings[actionType];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md">
        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-12 h-12 ${currentSettings.iconColor} rounded-full flex items-center justify-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {currentSettings.icon}
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">
            {currentSettings.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 text-center">
            {message}
          </p>
          <div className="flex gap-0.5 w-full flex-col sm:flex-row">
            <button
              onClick={onCancel}
              className="cursor-pointer flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`cursor-pointer flex-1 py-2 px-4 ${currentSettings.buttonColor} rounded-md text-sm font-medium text-white transition-colors`}
            >
              {currentSettings.confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
