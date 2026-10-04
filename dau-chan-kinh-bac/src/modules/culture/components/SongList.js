/**
 * @file modules/culture/components/SongList.js
 * @description Lưới thẻ "Thưởng thức làn điệu cổ": tích hợp Dropdown lọc thể loại làn điệu
 * (Giọng lề lối, Giọng vặt, Giọng giã bạn...), mỗi thẻ có nút nghe thử,
 * tại một thời điểm chỉ một bài ở trạng thái "đang phát".
 */

'use client';

import { useMemo, useState } from 'react';
import { Clock, Music, Pause, Play } from 'lucide-react';
import Dropdown from '@/components/shared/Dropdown';
import IconText from '@/components/shared/IconText/IconText';
import NoResults from '@/components/shared/NoResults/NoResults';
import { culture as t } from '@/locales/vi/culture';
import { cx } from '@/logic/classNames';

const ALL_SONG_TYPES = 'all';

/**
 * Một thẻ bài hát.
 * @param {Object} props
 * @param {{ title: string, type: string, dur: string, desc: string }} props.song - Bài hát.
 * @param {boolean} props.isPlaying - Bài đang phát?
 * @param {() => void} props.onToggle - Bật/tắt phát thử.
 * @returns {JSX.Element}
 */
function SongCard({ song, isPlaying, onToggle }) {
  const PlayIcon = isPlaying ? Pause : Play;

  return (
    <div className={cx('song-card', isPlaying && 'song-card--playing')}>
      {/* Hàng đầu: loại giọng – thời lượng */}
      <div className="song-card__head">
        <span className="song-card__type">{song.type}</span>
        <IconText gap="xs" className="song-card__duration">
          <Clock size={15} /> {song.dur}
        </IconText>
      </div>

      <h4 className="song-card__title">{song.title}</h4>
      <p className="song-card__desc">{song.desc}</p>

      {/* Nút nghe thử */}
      <button
        type="button"
        aria-pressed={isPlaying}
        className={cx('song-card__play', isPlaying && 'song-card__play--active')}
        onClick={onToggle}
      >
        <PlayIcon size={15} fill="currentColor" />
        <span>{isPlaying ? t.songs.playing : t.songs.play}</span>
      </button>
    </div>
  );
}

/**
 * @param {{ songs: Array<{ title: string, type: string, dur: string, desc: string }> }} props
 * @returns {JSX.Element}
 */
export default function SongList({ songs = [] }) {
  const [selectedType, setSelectedType] = useState(ALL_SONG_TYPES);
  /** Tên bài đang phát (null = không phát) */
  const [playing, setPlaying] = useState(null);

  /** Trích xuất các thể loại làn điệu duy nhất */
  const songTypeOptions = useMemo(() => {
    const types = Array.from(new Set(songs.map((s) => s.type))).filter(Boolean);
    return [
      { value: ALL_SONG_TYPES, label: t.songs.allTypes },
      ...types.map((type) => ({ value: type, label: type })),
    ];
  }, [songs]);

  /** Danh sách bài hát sau khi lọc */
  const filteredSongs = useMemo(() => {
    if (selectedType === ALL_SONG_TYPES) return songs;
    return songs.filter((s) => s.type === selectedType);
  }, [songs, selectedType]);

  /**
   * Bật bài mới hoặc tắt nếu bấm lại bài đang phát.
   * @param {string} title - Tên bài.
   */
  const toggle = (title) => setPlaying((current) => (current === title ? null : title));

  return (
    <section className="container spacer-bottom-lg">
      {/* Thanh công cụ lọc làn điệu Quan họ với Dropdown */}
      <div className="song-filter-bar">
        <div className="song-filter-bar__lead">
          <Music size={18} className="song-filter-bar__icon" />
          <span className="song-filter-bar__title">{t.songs.filterLabel}</span>
        </div>

        <div className="song-filter-bar__dropdown">
          <Dropdown
            id="culture-song-type-dropdown"
            ariaLabel={t.songs.filterLabel}
            value={selectedType}
            onChange={setSelectedType}
            options={songTypeOptions}
          />
        </div>

        <div className="song-filter-bar__count">
          <span>{t.songs.count(filteredSongs.length)}</span>
        </div>
      </div>

      {filteredSongs.length === 0 ? (
        <NoResults
          message={t.songs.noResults}
          actionLabel={t.songs.resetFilter}
          onReset={() => setSelectedType(ALL_SONG_TYPES)}
        />
      ) : (
        <div className="song-grid">
          {filteredSongs.map((song) => (
            <SongCard
              key={song.title}
              song={song}
              isPlaying={playing === song.title}
              onToggle={() => toggle(song.title)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
