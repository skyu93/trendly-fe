export function Splash() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white transition-opacity duration-500">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 animate-pulse">
          {/* 로고나 아이콘을 넣을 위치 */}
          <div className="w-full h-full bg-blue-500 rounded-lg" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 animate-fade-in">
          Trendly
        </h1>
        <span className="font-bold text-gray-800 animate-fade-in">
          당신의 생각이 트렌드가 되는 순간
        </span>
      </div>
    </div>
  );
};
