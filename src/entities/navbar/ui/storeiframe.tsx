import { useEffect, useRef } from "react";
import styles from './styles/iframe.module.scss'

const StoreIframe: React.FC<any> = ({
  src,
  token
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    (window as any).targetIframe = iframeRef.current
    const onOpostMessage = (event: any) => {
      const action = event.data?.action;
      if (action === "targetReady") sendTokenToTarget()
    }
    window.addEventListener("message", onOpostMessage);
    return () => {
      window.removeEventListener("message", onOpostMessage);
    }
    // eslint-disable-next-line
  }, []);

  const sendTokenToTarget = () => {
    iframeRef.current?.contentWindow?.postMessage({ token, action: "sendToken"}, "*")
  }

  return (
    <div className={styles.iframeContainer}>
      <iframe
        title="store-iframe"
        ref={iframeRef}
        src={src}
      ></iframe>
    </div>
  )
}

export default StoreIframe;