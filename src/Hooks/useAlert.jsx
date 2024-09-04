import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const SweetAlert = withReactContent(Swal);

const useAlert = () => {
  const showAlert = ({
    title = '',
    text = '',
    // icon = 'info',
    confirmButtonText = 'OK',
    showCancelButton = false,
    cancelButtonText = 'Cancel',
    onConfirm = null,
    onCancel = null,
  }) => {
    SweetAlert.fire({
      title,
      text,
    //   icon,
      showCancelButton,
      confirmButtonText,
      cancelButtonText,
      customClass: {
        popup: 'bg-white dark:bg-darkPrimary text-gray-800 dark:text-white rounded-lg shadow-lg',
        title: 'text-lg font-semibold',
        content: 'text-sm',
        confirmButton: 'bg-primary hover:bg-primaryHoverbg text-white py-2 px-4 rounded mr-4',
        cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();
      } else if (result.isDismissed && onCancel) {
        onCancel();
      }
    });
  };

  return showAlert;
};

export default useAlert;
