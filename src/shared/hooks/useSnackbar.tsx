import { Snackbar } from "entities/snackBar/ui/snackbar";
import { useRef } from "react"
import { renderToStaticMarkup } from "react-dom/server";

type Arguments = {
  duration: number
}
export const useSnackbar = ({ duration = 2000 }: Arguments) => {
  const rootModal = useRef<HTMLDivElement>(document.getElementById("rootModal") as HTMLDivElement);

  const toHtml = (htmlString: string) => {
    const parser = new DOMParser();
    const html = parser.parseFromString(htmlString, "text/html");
    const closeNode = html.getElementById("closeSnackbar") as HTMLSpanElement;
    const snackbarProgress = html.getElementById("snackbarProgress") as HTMLDivElement;
    const snackbarNode = html.body.children[0] as HTMLDivElement;

    return { closeNode, snackbarProgress, snackbarNode };
  };

  const appendSnackbar = (message: string) => {
    return new Promise((resolve, reject) => {
      try {
        const { closeNode, snackbarProgress, snackbarNode } = toHtml(
          renderToStaticMarkup(
            <Snackbar>{message}</Snackbar>
          )
        );
  
        if (!rootModal.current.hasChildNodes()) {
          const snackbarContainer = document.createElement('div');
  
          snackbarContainer.id = "snackbarContainer";
          snackbarContainer.style.position = "absolute"
          snackbarContainer.style.right = "10px"
          snackbarContainer.style.top = "90px"
  
          rootModal.current.appendChild(snackbarContainer);
        }
  
        rootModal.current.firstChild?.appendChild(snackbarNode);
  
        closeNode.addEventListener("click", () => {
          snackbarNode?.remove();
        });
  
        const animation = snackbarProgress?.animate([
          { width: "0px" },
          { width: "100%" },
        ], duration);
  
        animation.onfinish = () => {
          snackbarNode?.remove();
          resolve(true)
        }
      } catch (error) {
        reject(error);
      }
    })
  };

  return { appendSnackbar }
}
