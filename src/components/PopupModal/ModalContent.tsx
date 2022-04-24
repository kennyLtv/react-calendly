import * as React from "react";
import "../../calendly-widget.css";
import {
  PageSettings,
  Prefill,
  Utm,
  IframeTitle,
  formatCalendlyUrl,
} from "../../calendly";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {
  CalendlyEventHandlers,
  useCalendlyEventListenerScoped,
} from "../hooks/useCalendlyEventListener";

export interface Props extends CalendlyEventHandlers {
  url: string;
  prefill?: Prefill;
  utm?: Utm;
  pageSettings?: PageSettings;
  iframeTitle?: IframeTitle;
}

const ModalContent = (props: Props) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const {
    onDateAndTimeSelected,
    onEventScheduled,
    onEventTypeViewed,
    onProfilePageViewed,
  } = props;
  useCalendlyEventListenerScoped(
    {
      onDateAndTimeSelected,
      onEventScheduled,
      onEventTypeViewed,
      onProfilePageViewed,
    },
    iframeRef
  );
  const onLoad = () => setIsLoading(false);

  const src = formatCalendlyUrl({
    url: props.url,
    pageSettings: props.pageSettings,
    prefill: props.prefill,
    utm: props.utm,
    embedType: "PopupWidget",
  });

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        frameBorder="0"
        title={props.iframeTitle || "Calendly Scheduling Page"}
        onLoad={onLoad}
        src={src}
      ></iframe>
    </>
  );
};

export default ModalContent;
