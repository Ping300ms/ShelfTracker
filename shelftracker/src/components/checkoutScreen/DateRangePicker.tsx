import "./DateRangePicker.css"

interface DateRangePickerProps {
    startDate: string;
    endDate: string;
    minDate: string;
    onStartChange: (date: string) => void;
    onEndChange: (date: string) => void;
}

export function DateRangePicker({
                                    startDate,
                                    endDate,
                                    minDate,
                                    onStartChange,
                                    onEndChange,
                                }: DateRangePickerProps) {
    return (
        <div className="date-range-picker__container">
            <label>
                Début
                <input
                    type="datetime-local"
                    value={startDate}
                    min={minDate}
                    onChange={(e) => onStartChange(e.target.value)}
                    className="date-range-picker__input"
                />
            </label>

            <label>
                Fin
                <input
                    type="datetime-local"
                    value={endDate}
                    min={startDate || minDate}
                    onChange={(e) => onEndChange(e.target.value)}
                    className="date-range-picker__input"
                />
            </label>
        </div>
    );
}
