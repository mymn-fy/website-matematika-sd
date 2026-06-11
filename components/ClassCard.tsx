import React from 'react';
import Card from './ui/Card';
import Button from './ui/Button';

interface ClassCardProps {
  classNumber: number;
  theme: string;
  emoji: string;
  materials: string[];
  progress?: number;
  totalProgress?: number;
}

const ClassCard: React.FC<ClassCardProps> = ({
  classNumber,
  theme,
  emoji,
  materials,
  progress = 0,
  totalProgress = 100,
}) => {
  const progressPercent = (progress / totalProgress) * 100;

  return (
    <Card hoverable className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white font-poppins mb-1">
            Kelas {classNumber}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{theme}</p>
        </div>
        <div className="text-5xl animate-bounce-soft">{emoji}</div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Materi:</p>
        <div className="flex flex-wrap gap-2">
          {materials.map((material, idx) => (
            <span
              key={idx}
              className="bg-sky-blue bg-opacity-20 text-sky-blue dark:text-sky-blue rounded-full px-3 py-1 text-xs font-semibold"
            >
              {material}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Progres: {progress}/{totalProgress}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-sky-blue to-mint-green h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <Button variant="success" className="w-full mt-4" href={`/games/class-${classNumber}`}>
        Mainkan Game 🎮
      </Button>
    </Card>
  );
};

export default ClassCard;
