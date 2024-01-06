import { makeStyles } from "@mui/styles";



export function gettoastOptions(){
    const toastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    return toastOptions;
}
export const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: 'url("https://picsum.photos/1920/1080")',
        backgroundSize: 'cover',
        backgroundBlendMode: 'screen',
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        opacity: 0.45
    },
}));

