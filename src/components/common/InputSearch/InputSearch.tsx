import { StyledCloseIcon, StyledContainer } from "./inputSearch.styled";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

interface InputSearchProps {
  value: string;
  onClick: () => void;
  onChange?: (event: any) => void;
  onClearSearch: () => void;
  width?: string;
}

const InputSearch = ({
  value,
  onClick,
  onChange,
  onClearSearch,
  width,
}: InputSearchProps) => {
  // const renderResults = () => {
  //   return (
  //     <>
  //       {results.map((elem: any, index: number) => (
  //         <StyledResult key={elem.id}>
  //           {/* <Link
  //             href={{
  //               pathname: "/[category]/[article]",
  //               query: {
  //                 category: elem.categories?.[0]?.url,
  //                 article: elem.url,
  //               },
  //             }}
  //             onClick={() => {
  //               handleClearSearch();
  //               setHiddenNoResults(true);
  //             }}
  //           > */}
  //           <StyledItem>
  //             {/* <TextBody size="m" color="neutral" colorTone={500}> */}
  //             {elem.title}
  //             {/* </TextBody> */}
  //           </StyledItem>
  //           {/* </Link> */}

  //           {index !== results.length - 1 && (
  //             <StyledContainerDivider>
  //               <Divider variant="fullWidth" />
  //             </StyledContainerDivider>
  //           )}
  //         </StyledResult>
  //       ))}
  //     </>
  //   );
  // };

  // const renderNoResults = () => {
  //   return (
  //     <StyledWithoutResults>
  //       {/* <EmojiSadIcon size="m" color="neutral" colorTone="500" />
  //       <TextBody size="m" color="neutral" colorTone={500}> */}
  //       {hasError
  //         ? "Ocurrió un error, inténtelo más tarde"
  //         : "No encontramos resultados"}
  //       {/* </TextBody> */}
  //     </StyledWithoutResults>
  //   );
  // };

  return (
    <>
      <StyledContainer className="container" width={width}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar en APC..."
            inputProps={{ "aria-label": "Buscar en APC" }}
            value={value}
            onChange={onChange}
          />

          <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={onClick}>
            <SearchIcon sx={{ color: "#577590" }} />
          </IconButton>

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
          >
            <StyledCloseIcon onClick={onClearSearch}>
              <CloseIcon sx={{ color: "#577590" }} />
            </StyledCloseIcon>
          </IconButton>
        </Paper>
      </StyledContainer>
    </>
  );
};

export default InputSearch;
