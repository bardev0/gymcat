
export interface IRow {
    seriesNumber: number;
    muscleGroup: string;
    exerciseName: string;
    exerciseMultiplier: number;
    repetitions: number;
    weight: number;
    totalExercise: number;
}

export interface IWorkout {
    workoutOwner: string;
    date: string;
    timeStart: string;
    timeEnd: string;
    listOfRows: Array<IRow>;
    totalDay: number | undefined;

    addRows: Function;
}

