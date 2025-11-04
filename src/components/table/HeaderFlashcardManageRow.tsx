export default function HeaderFlashcardManageRow({
  nativeLanguageFlagUrl,
  targetLanguageFlagUrl,
}: {
  nativeLanguageFlagUrl?: string;
  targetLanguageFlagUrl?: string;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full p-4 rounded  sticky top-0 z-10">
      <div className="flex gap-8 w-full">
        <p className="flex gap-2 items-center w-1/2">
          <img
            src={nativeLanguageFlagUrl}
            className="w-6 h-6 object-contain flag"
          />
          <strong>Mot natif</strong>
        </p>
        <p className="flex gap-2 items-center w-1/2">
          <img
            src={targetLanguageFlagUrl}
            className="w-6 h-6 object-contain flag"
          />
          <strong>Mot traduit</strong>
        </p>
      </div>
      <div className="flex gap-4 justify-center items-center md:justify-end w-full">
        <span className="w-38" />
        <span className="w-38" />
      </div>
    </div>
  );
}
